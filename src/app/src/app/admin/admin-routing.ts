import {Routes} from "@angular/router";
import {UserUsageComponent} from "@app/admin/user-usage/user-usage.component";
import {ServerUsageComponent} from "@app/admin/server-usage/server-usage.component";
import {RegistrationRequestsComponent} from "@app/admin/registration-requests/registration-requests.component";
import {AddGameComponent} from "@app/admin/add-game/add-game.component";
import {AddServerComponent} from "@app/admin/add-server/add-server.component";
import {ManageUsersComponent} from "@app/admin/manage-users/manage-users.component";
import {AdminHomeComponent} from "@app/admin/admin-home/admin-home.component";

export const adminRoutes: Routes = [
  {
    path: "",
    component: AdminHomeComponent,
  },
  {
    path: "userUsage",
    component: UserUsageComponent,
  },
  {
    path: "serverUsage",
    component: ServerUsageComponent,
  },
  {
    path: "pendingRegistations",
    component: RegistrationRequestsComponent,
  },
  {
    path: "addGame",
    component: AddGameComponent,
  },
  {
    path: "addServer",
    component: AddServerComponent,
  },
  {
    path: "users",
    component: ManageUsersComponent,
  },
]
