import React from "react";
import "./Filter.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import Slider from "@mui/material/Slider";

const Filter = ({ rentProducts, onFilterChange, onStyleChange,onPriceChange  }) => {
  // State for price range, filtered products, and selected filters
  const [value, setValue] = React.useState([500, 3000]);
  const [filteredProducts, setFilteredProducts] = React.useState(rentProducts);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedStyles, setSelectedStyles] = React.useState([]);


  // Handle price range slider change
  const handleChangePrice = (event, newValue) => {
    setValue(newValue);
    filterByPrice(newValue);
  };
// Filter products based on price range
  const filterByPrice = (priceRange) => {
    const [minPrice, maxPrice] = priceRange;
    const filtered = rentProducts.filter((product) => {
      const productPrice = parseFloat(product.price);
      return productPrice >= minPrice && productPrice <= maxPrice;
    });
    setFilteredProducts(filtered);
    onPriceChange(filtered);
  };



//   // Static data for categories including "All Products"
//   const filterCategories = ["All Products", "Mariage", "Oriental", "Cocktail"];

//   // Handle category click
//   const handleClick = (e) => {
//     e.preventDefault();
//     const selectedCategory = e.target.textContent.trim();
//     console.log("Selected Category:", selectedCategory);

//     // Check if "All Products" is selected
//     if (selectedCategory === "All Products") {
//       setFilteredProducts(rentProducts);
//       onFilterChange(rentProducts);
//       return;
//     }



// // Filter products based on the selected category
// const filtered = rentProducts.filter((product) =>
//   product.subcategory?.toLowerCase() === selectedCategory.toLowerCase()
// );

// console.log("Filtered Products By category: filter component ", filtered);
// setFilteredProducts(filtered); // Update the filtered products state
// onFilterChange(filtered); // Call onFilterChange once with the filtered products
// console.log("Filtered Products sent to Parent: filter component ", filtered);

// };



  // Static data for styles
  const filterStyles = ["All Styles", "sirène", "cloche"];

  // Handle style click
  const handleClickStyle = (e) => {
    e.preventDefault();
    const selectedStyle = e.target.textContent.trim().toLowerCase();
    console.log("Selected Style:", selectedStyle);

    // Check if "All Styles" is selected
    if (selectedStyle === "All Styles") {
      setFilteredProducts(rentProducts);
      onStyleChange(rentProducts);
      return;
    }

    // Filter products based on the selected style
    const filtered = rentProducts.filter((product) =>
      product.style?.toLowerCase() === selectedStyle
    );

    console.log("Filtered Products By style: filter componentn ", filtered);
    setFilteredProducts(filtered);
    onStyleChange(filtered);
  };

  return (
    <div className="filterSection">
      {/* Product Categories */}
      {/* <div className="filterCategories">
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
      </div> */}

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
              onChange={handleChangePrice}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `$${value}`}
              min={500} // Minimum price
              max={5000} // Adjust as needed
              step={100} // Step size
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

