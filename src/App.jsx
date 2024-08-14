import { useState } from "react";
import "./App.css";
import prod from "./products.json";
import Form from "react-bootstrap/Form";

function App() {
  const [products, setProducts] = useState(prod);
  const [category, setCategory] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [company, setCompany] = useState("all");
  const [price, setPrice] = useState(100000);
  function handleSearch(event) {
    let copied = [...products];
    if (category != "all") {
      copied = copied.filter((value) => {
        return value.category.toLowerCase() == category.toLowerCase();
      });
    }
    if (company != "all") {
      copied = copied.filter((value) => {
        return value.company.toLowerCase() == company.toLowerCase();
      });
    }
    copied = copied.filter((value) => {
      return value.price <= price;
    });
    setFilteredData(copied);
  }
  return (
    <>
      <div className="container-filter">
        <form action="">
          <label>
            Search Product
            <input type="text" />
          </label>
          <label>
            Select Category
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <option value="all">all</option>
              <option value="Tables">Tables</option>
              <option value="Chairs">Chairs</option>
              <option value="Kids">Kids</option>
              <option value="Sofas">Sofas</option>
              <option value="Beds">Beds</option>
            </select>
          </label>
          <label>
            Select Company
            <select
              value={company}
              onChange={(event) => {
                setCompany(event.target.value);
              }}
            >
              <option value="all">all</option>
              <option value="Milacron Inc.">Milacron Inc.</option>
              <option value="Modenza">Modenza</option>
              <option value="Luxora">Luxora</option>
              <option value="Artifex">Artifex</option>
              <option value="Comfora">Comfora</option>
              <option value="Homestead">Homestead</option>
            </select>
          </label>
          <label>
            Sort by
            <select>
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
              <option value="high">high</option>
              <option value="low">low</option>
            </select>
          </label>
        </form>
        <div className="bottom-container">
          <label>
            Select priceㅤㅤㅤㅤㅤ{price / 100 + ".00$"}
            <input
              onChange={(e) => {
                setPrice(e.target.value * 1000);
                console.log(price);
              }}
              step={1}
              type="range"
              name=""
              id=""
            />
          </label>
          <label>
            Free Shipping
            <input className="chk" type="checkbox" name="" id="" />
          </label>
          <div className="btns">
            <button onClick={handleSearch} style={{ background: "#057aff" }}>
              SEARCH
            </button>
            <button style={{ background: "#c149ad" }}>RESET</button>
          </div>
        </div>
      </div>
      <div className="cards">
        {!filteredData.length &&
          products.map((product, index) => {
            return (
              <div key={index} className="card">
                <img src={product.image} width={320} height={192} alt="" />
                <h2>{product.title}</h2>
                <span>{product.price / 100}$</span>
                <p>{product.company}</p>
              </div>
            );
          })}
        {filteredData &&
          filteredData.map((product, index) => {
            return (
              <div key={index} className="card">
                <img src={product.image} width={320} height={192} alt="" />
                <h2>{product.title}</h2>
                <span>{product.price / 100}$</span>
                <p>{product.company}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
