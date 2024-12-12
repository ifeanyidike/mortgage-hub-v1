import { CalendarAccounts } from "@/app/pages/account/home/user-profile";
import {
  Account,
  AuthTwoFactor,
  Connections,
  PaymentHistory,
  SetGoal,
  Upgrade,
  YourCurrentPlan,
} from "./blocks";
import { observer } from "mobx-react-lite";
import { RecentUploads } from "./blocks/RecentUploads";

const UserAccountSettingsEnterpriseContent = observer(() => {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <Upgrade />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
        <div className="col-span-1">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <Account title="Account" />

            <AuthTwoFactor />
            <PaymentHistory />
            {/* <CalendarAccounts /> */}
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            {/* <YourCurrentPlan /> */}

            <SetGoal />

            <Connections />
            <RecentUploads title="My Files" />
          </div>
        </div>
      </div>
    </div>
  );
});

export { UserAccountSettingsEnterpriseContent };
