import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import PortfolioApi from "@lib/api/portfolio";

/**
 * Content specific to the user, NextJS always try/recommends to load it on the client
 */
const PortfolioDetails = ({ portfolioDetails }) => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  return (
    <BaseLayout user={user} loading={isLoading} error={error}>
      <BasePage header="Portfolio Details">
        {JSON.stringify(portfolioDetails)}
      </BasePage>
    </BaseLayout>
  );
};

/**
 * Good if content changes often
 */
export async function getServerSideProps({ query }) {
  const json = await new PortfolioApi().getById(query.id);
  const portfolioDetails = json.data;

  return { props: { portfolioDetails } };
}
//________________END______________

/**
 * Static props good when not chanign often
 */
// // This is excecuted on build time
// export async function getStaticPaths() {
//   const json = await new PortfolioApi().getAll();
//   const portfolios = json.data;

//   // get the pahs we want pre-render based on portfolio id
//   const paths = portfolios.map((portfolio) => {
//     return {
//       params: { id: portfolio._id },
//     };
//   });

//   // fallback false means that "not found" pages weill be resolved into 404 page
//   return {
//     paths,
//     fallback: false,
//   };
// }

// // static props, good if content if not changing often
// export async function getStaticProps({ params }) {
//   const json = await new PortfolioApi().getById(params.id);
//   const portfolioDetails = json.data;

//   return {
//     props: {
//       portfolioDetails,
//     },
//   };
// }

//_________END________________

export default PortfolioDetails;
