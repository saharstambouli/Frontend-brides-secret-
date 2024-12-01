import React from "react";
import "./FilterForSale.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import Slider from "@mui/material/Slider";

const Filter = ({ saleProducts, onFilterChange, onStyleChange }) => {
  // State for price range, filtered products, and selected filters
  const [value, setValue] = React.useState([500, 3000]);
  const [filteredProducts, setFilteredProducts] = React.useState(saleProducts);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedStyles, setSelectedStyles] = React.useState([]);

  // Handle price range slider change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Static data for categories including "All Products"
  const filterCategories = ["All Products", "Mariage", "Oriental", "Cocktail"];

  // Handle category click
  const handleClick = (e) => {
    e.preventDefault();
    const selectedCategory = e.target.textContent.trim();
    console.log("Selected Category:", selectedCategory);

    // Check if "All Products" is selected
    if (selectedCategory === "All Products") {
      setFilteredProducts(saleProducts);
      onFilterChange(saleProducts);
      return;
    }

    // Filter products based on the selected category
    const filtered = saleProducts.filter((product) =>
      product.subcategory?.toLowerCase() === selectedCategory.toLowerCase()
    );

    console.log("Filtered Products By category:", filtered);
    setFilteredProducts(filtered);
    onFilterChange(filtered);
  };

  // Static data for styles
  const filterStyles = ["All Styles", "sirène", "cloche"];

  // Handle style click
  const handleClickStyle = (e) => {
    e.preventDefault();
    const selectedStyle = e.target.textContent.trim().toLowerCase();
    console.log("Selected Style:", selectedStyle);

    // Check if "All Styles" is selected
    if (selectedStyle === "All Styles") {
      setFilteredProducts(saleProducts);
      onStyleChange(saleProducts);
      return;
    }

    // Filter products based on the selected style
    const filtered = saleProducts.filter((product) =>
      product.style?.toLowerCase() === selectedStyle
    );

    console.log("Filtered Products By style:", filtered);
    setFilteredProducts(filtered);
    onStyleChange(filtered);
  };

  return (
    <div className="filterSection">
      {/* Product Categories */}
      <div className="filterCategories">
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary expandIcon={<IoIosArrowDown size={20} />} sx={{ padding: 0, marginBottom: 2 }}>
            <h5 className="filterHeading">Product Categories</h5>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <div className="categoryTextRow">
              {filterCategories.map((category, index) => (
                <span key={index} onClick={handleClick} className="categoryText">
                  {category}
                </span>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* Style */}
      <div className="filterStyles">
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary expandIcon={<IoIosArrowDown size={20} />} sx={{ padding: 0, marginBottom: 2 }}>
            <h5 className="filterHeading">Style</h5>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <div className="styleTextRow">
              {filterStyles.map((style, index) => (
                <span key={index} onClick={handleClickStyle} className="styleText">
                  {style}
                </span>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* Price Filter */}
      <div className="filterPrice">
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary expandIcon={<IoIosArrowDown size={20} />} sx={{ padding: 0, marginBottom: 2 }}>
            <h5 className="filterHeading">Price</h5>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `$${value}`}
              sx={{
                color: "black",
                "& .MuiSlider-thumb": {
                  backgroundColor: "white",
                  border: "2px solid black",
                  width: 18,
                  height: 18,
                },
              }}
            />
            <div className="priceRange">
              <p>
                Min Price: <span>${value[0]}</span>
              </p>
              <p>
                Max Price: <span>${value[1]}</span>
              </p>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Filter;

