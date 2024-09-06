import { useRef, useState } from "react";
import "./App.css";
import prod from "./products.json";
import Form from "react-bootstrap/Form";

function App() {
  const [products, setProducts] = useState(prod);
  const [category, setCategory] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [company, setCompany] = useState("all");
  const [price, setPrice] = useState(100000);
  let shipping = useRef("");
  console.log(shipping.current.checked);
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
      if (shipping != undefined) {
        copied = copied.filter((value) => {
          return value.shipping == shipping.current.checked;
        });
      }
    }
    copied = copied.filter((value) => {
      return value.price <= price;
    });
    setFilteredData(copied);
  }
  function Search(e) {
    let copied = [...products];
    copied.filter((value) => {
      return value.name == e.target.value;
    });
    setFilteredData(copied);
  }
  let form = useRef("");

  return (
    <>
      <div className="container-filter">
        <form action="" ref={form}>
          <label>
            Search Product
            <input type="text" onChange={Search} />
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
            <input
              className="chk"
              ref={shipping}
              type="checkbox"
              name=""
              id=""
            />
          </label>
          <div className="btns">
            <button onClick={handleSearch} style={{ background: "#057aff" }}>
              SEARCH
            </button>
            <button
              onClick={() => location.reload()}
              style={{ background: "#c149ad" }}
            >
              RESET
            </button>
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
                <span>{JSON.stringify(product.shipping)}</span>
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
                <span>{JSON.stringify(product.shipping)}</span>
                <p>{product.company}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
