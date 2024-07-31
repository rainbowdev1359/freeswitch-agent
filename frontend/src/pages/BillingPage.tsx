import { HeaderHome } from "../component/Home";
import BillingComponent from "../component/billing/billingComponent";
import { HomeContainer, PageContainer } from "../component/StyleComponents";

export const BillingPage = () => {
  return (
    <HomeContainer>
      <HeaderHome />
      <PageContainer>
        <BillingComponent />
      </PageContainer>

    </HomeContainer>
  );
};
