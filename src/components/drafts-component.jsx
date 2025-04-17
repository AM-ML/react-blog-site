import "../css/components/drafts-component.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Router";
import axios from "axios";
import Preloader from "../common/preloader";
import BlogCard from "./blog-card";
import LoadMoreBtn from "../common/load-more";
import filterPaginationData from "../common/pagination";
import { Toaster } from "react-hot-toast";

const DraftsComponent = () => {
  const [drafts, setDrafts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const getDrafts = (page = 1) => {
    setFetchLoading(true);

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/user-drafts",
        { page },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(async ({ data }) => {
        const paginationData = await filterPaginationData({
          create_new_array: page === 1,
          current_data: drafts,
          new_data: data.blogs,
          page,
          totalDocs: data.totalDocs,
        });

        setDrafts(paginationData);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
        setFetchLoading(false);
      });
  };

  const loadMoreDrafts = () => {
    if (drafts && drafts.results.length < drafts.totalDocs) {
      getDrafts(drafts.page + 1);
    }
  };

  // Handle blog deletion
  const handleDeleteDraft = (blogId) => {
    // Remove the draft from the list
    if (drafts && drafts.results) {
      const updatedResults = drafts.results.filter(
        (draft) => draft.blog_id !== blogId
      );
      setDrafts({
        ...drafts,
        results: updatedResults,
        totalDocs: drafts.totalDocs - 1,
      });
    }
  };

  useEffect(() => {
    getDrafts();
  }, []);

  return (
    <div className="dfc-container">
      <Toaster />
      {loading ? (
        <Preloader />
      ) : (
        <>
          <div className="dfc-row">
            <div className="dfc-col">
              <h1 className="dfc-title">Your Drafts</h1>
              <p className="dfc-subtitle">
                View and edit your unpublished blogs
              </p>
            </div>
          </div>

          <div className="dfc-blogs-container">
            {drafts && drafts.results.length ? (
              <>
                {drafts.results.map((draft, i) => (
                  <BlogCard
                    key={i}
                    blog={{ ...draft, draft: true }}
                    addBorder={i !== drafts.results.length - 1}
                    onDelete={handleDeleteDraft}
                  />
                ))}

                {drafts.results.length < drafts.totalDocs && (
                  <LoadMoreBtn
                    handleLoadMore={loadMoreDrafts}
                    loading={fetchLoading}
                  />
                )}
              </>
            ) : (
              <h1 className="dfc-no-data">No Drafts Found.</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DraftsComponent;
