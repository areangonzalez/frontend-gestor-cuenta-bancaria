import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { IBreadcrumb } from 'src/app/core/models';
import { BreadcrumbsService, AutenticacionService } from 'src/app/core/services';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  // The breadcrumbs of the current route
  private currentBreadcrumbs: IBreadcrumb[];
  // All the breadcrumbs
  public breadcrumbs: IBreadcrumb[];

  @Input()
  public allowBootstrap: boolean;

  @Input()
  public addClass: string;


  public constructor(private breadcrumbService: BreadcrumbsService, private activatedRoute: ActivatedRoute, private router: Router, private _auth: AutenticacionService) {
    breadcrumbService.get().subscribe((breadcrumbs: IBreadcrumb[]) => {
      this.breadcrumbs = breadcrumbs as IBreadcrumb[];
    });
  }

  public hasParams(breadcrumb: IBreadcrumb) {
    return Object.keys(breadcrumb.params).length ? [breadcrumb.url, breadcrumb.params] : [breadcrumb.url];
  }


  public ngOnInit() {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
    const ROUTE_PARAM_BREADCRUMB: string = "breadcrumb";
    const PREFIX_BREADCRUMB: string = "prefixBreadcrumb";

    // subscribe to the NavigationEnd event
    //this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
    this.router.events.subscribe(event => {
      // reset currentBreadcrumbs
      this.currentBreadcrumbs = [];

      // get the root of the current route
      let currentRoute: ActivatedRoute = this.activatedRoute.root;

      // set the url to an empty string
      let url: string = "";
      // iterate from activated route to children
      while (currentRoute.children.length > 0) {
        let childrenRoutes: ActivatedRoute[] = currentRoute.children;
        let breadCrumbLabel: string = "";


        // iterate over each children
        childrenRoutes.forEach(route => {
          // Set currentRoute to this route
          currentRoute = route;

          // Verify this is the primary route
          if (route.outlet !== PRIMARY_OUTLET) {
            return;
          }

          const hasData = (route.routeConfig && route.routeConfig.data);
          const hasDynamicBreadcrumb: boolean = route.snapshot.params.hasOwnProperty(ROUTE_PARAM_BREADCRUMB);
          // console.log("hasDynamicBreadcrumb: ", hasDynamicBreadcrumb);
          if (hasData || hasDynamicBreadcrumb) {
            /*
             Verify the custom data property "breadcrumb"
             is specified on the route or in its parameters.

             Route parameters take precedence over route data
             attributes.
             */
            if (hasDynamicBreadcrumb) {
              breadCrumbLabel = route.snapshot.params[ROUTE_PARAM_BREADCRUMB].replace(/_/g, " ");
            } else if (route.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
              breadCrumbLabel = route.snapshot.data[ROUTE_DATA_BREADCRUMB];
            }

            // Get the route's URL segment
            let routeURL: string = route.snapshot.url.map(segment => segment.path).join("/");
            url += `/${routeURL}`;

            // Cannot have parameters on a root route
            if (routeURL.length === 0) {
              route.snapshot.params = {};
            }

            // Add breadcrumb
            let breadcrumb: IBreadcrumb = {
              label: breadCrumbLabel,
              params: {},
              url: url
            };

            // Add the breadcrumb as 'prefixed'. It will appear before all breadcrumbs
            if (route.snapshot.data.hasOwnProperty(PREFIX_BREADCRUMB)) {
              this.breadcrumbService.storePrefixed(breadcrumb);
            }
            else {
              this.currentBreadcrumbs.push(breadcrumb);
            }

          }

        });
        this.breadcrumbService.store(this.currentBreadcrumbs);
      }
    });

    // verifico el logueo
    this.estoyLogueado();
  }// fin ngOnInit

  estoyLogueado(){
    return (this._auth.loggedIn) ? true : false;
  }
}
