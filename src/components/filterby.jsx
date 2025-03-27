import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/components/filterby.css";

const FilterBy = ({ blogs, onFilter }) => {
  const [isOpen, setIsOpen] = useState(false); // Manage filter section visibility
  const [selectedTags, setSelectedTags] = useState([]); // Manage selected tags
  const [selectedDate, setSelectedDate] = useState(null); // Manage selected date
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    if (blogs?.results.length && !availableTags.length) {
      function getMostPopularTags() {
        const latestBlogs = blogs.results.slice(-30);
        const tagCount = {};

        latestBlogs.forEach((blog) => {
          blog.tags.forEach((tag) => {
            const lowerTag = tag.toLowerCase();
            tagCount[lowerTag] = (tagCount[lowerTag] || 0) + 1;
          });
        });

        return Object.entries(tagCount)
          .sort(([, countA], [, countB]) => countB - countA)
          .slice(0, 10)
          .map(([tag]) => tag);
      }

      setAvailableTags(getMostPopularTags());
    }
  }, [blogs]); // Add blogs as a dependency
  // Toggle the filter section visibility

  const toggleFilterSection = () => {
    setIsOpen(!isOpen);
  };

  // Handle tag selection
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag)); // Remove tag if it's already selected
    } else {
      setSelectedTags([...selectedTags, tag]); // Add tag if it's not selected
    }
  };

  // Apply filters and pass the selected tags and date to the parent component
  const applyFilters = () => {
    onFilter({ tags: selectedTags, date: selectedDate });
  };

  return (
    <div className="filter-by">
      <div
        className="modal fade "
        id="BlogsFilterByComponent"
        tabIndex="-1"
        aria-labelledby="NavbarSearchModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content border-none bg-transparent ">
            <div className="modal-header border-none">
              <button
                type="button"
                className="fltr-close mb-5 bx bx-x"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body g">
              <div className="filter-section">
                <h4>Filter By</h4>
                <div className="date-filter">
                  <p>Published After</p>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    isClearable
                    placeholderText="Select a date"
                  />
                </div>

                <div className="tags-filter">
                  <p>Tags</p>
                  <div className="tags-container d-inline-block ">
                    {availableTags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => handleTagClick(tag)}
                        className={`fby-tag rounded-pill ${
                          selectedTags.includes(tag) ? "selected" : ""
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apply Filter Button */}
                <button
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={applyFilters}
                  className="apply-filters-btn btn btn-outline-dark"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        data-bs-toggle="modal"
        data-bs-target="#BlogsFilterByComponent"
        className="ipn-route-btn ms-auto"
        onClick={toggleFilterSection}
      >
        <i className="bx bxs-filter-alt"></i> Filter Blogs
      </button>
    </div>
  );
};

export default FilterBy;
