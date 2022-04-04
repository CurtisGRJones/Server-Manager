import {Routes} from "@angular/router";
import {UserUsageComponent} from "@app/admin/user-usage/user-usage.component";
import {ServerUsageComponent} from "@app/admin/server-usage/server-usage.component";
import {RegistrationRequestsComponent} from "@app/admin/registration-requests/registration-requests.component";
import {AddGameComponent} from "@app/admin/add-game/add-game.component";
import {AddServerComponent} from "@app/admin/add-server/add-server.component";
import {ManageUsersComponent} from "@app/admin/manage-users/manage-users.component";

export const adminRoutes: Routes = [
  {
    path: "admin/userUsage",
    component: UserUsageComponent,
  },
  {
    path: "admin/serverUsage",
    component: ServerUsageComponent,
  },
  {
    path: "admin/pendingRegistations",
    component: RegistrationRequestsComponent,
  },
  {
    path: "admin/addGame",
    component: AddGameComponent,
  },
  {
    path: "admin/addServer",
    component: AddServerComponent,
  },
  {
    path: "admin/users",
    component: ManageUsersComponent,
  },
]
