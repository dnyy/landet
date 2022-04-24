import BaseLayout from "@components/layouts/BaseLayout";
import BasePage from "@components/BasePage";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import PortfolioApi from "@lib/api/portfolio";
import { formatDate } from "helpers/functions";

/**
 * Content specific to the user, NextJS always try/recommends to load it on the client
 */
const PortfolioDetails = ({ portfolioDetails }) => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  return (
    <BaseLayout
      user={user}
      loading={isLoading}
      error={error}
      navClass="transparent"
    >
      <BasePage
        indexPage
        noWrapper
        title={`${portfolioDetails.title} - Nedre Sundet`}
        metaDescription={portfolioDetails.description}
      >
        <div className="portfolio-detail">
          <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <main role="main" className="inner page-cover">
              <h1 className="cover-heading">{portfolioDetails.title}</h1>
              <p className="lead dates">
                {formatDate(portfolioDetails.startDate)} -{" "}
                {formatDate(portfolioDetails.endDate) || "Present"}
              </p>
              <p className="lead info mb-0">
                {portfolioDetails.jobTitle} | {portfolioDetails.company} |
                {portfolioDetails.location}
              </p>
              <p className="lead">{portfolioDetails.description}</p>
              <p className="lead">
                <a
                  href={portfolioDetails.companyWebsite}
                  target="_"
                  className="btn btn-lg btn-secondary"
                >
                  Visit Company
                </a>
              </p>
            </main>
          </div>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

/**
 * Good if content changes often
 * fetch data for every instance that a user issues a request to the page
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
