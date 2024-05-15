'use client'
import { useContext, useEffect, useState } from 'react';
import './Home.css'
import supabase from '../Config/supabaseclient';
import { userContext } from '../Context/usercontext';
import Navbar from '../Components/Navbar/Navbar';
import { useRouter } from 'next/navigation';
import { saveAs } from 'file-saver';

import Papa from 'papaparse';

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);



  const [name, setname] = useState('')
  const [price, setprice] = useState('')
  const [quantity, setquantity] = useState('')
  const [products, setproducts] = useState(null)
  const { user } = useContext(userContext)
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  useEffect(() => {
    {
      const getData = async () => {
        try {
          let { data: crud, error } = await supabase
            .from('crud')
            .select('*')
            .eq('user_id', user.id);

          if (error) {
            throw error;
          }
          setproducts(crud);
        } catch (error) {
          console.error('An error occurred while fetching data:', error.message);
        }
      };

      getData();
    }
  }, [user]);


  const handlesubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('crud')
        .insert([
          { name: name, price: price, Quantity: quantity, user_id: user.id },
        ])
        .select();

      if (error) {
        console.error('Error inserting data:', error.message);
        return;
      }

      if (data && data.length > 0) {
        const insertedProduct = data[0];
        console.log('Inserted data:', insertedProduct);

        setproducts(prevProducts => [...prevProducts, insertedProduct]);
      }

      setname('');
      setprice('');
      setquantity('');
      setEditMode(false);
    } catch (error) {
      console.error('Error handling submission:', error.message);
    }
  };




  const handledelete = async (productId) => {
    try {
      const { error } = await supabase
        .from('crud')
        .delete()
        .eq('id', productId);

      if (error) {
        throw error;
      }

      setproducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  const handleEdit = (id, name, price, quantity) => {
    setname(name);
    setprice(price);
    setquantity(quantity);
    setEditMode(true);
    setEditProductId(id);
  };

  const handleEditSubmit = async () => {
    try {

      await supabase
        .from('crud')
        .update({ name: name, price: price, Quantity: quantity })
        .eq('id', editProductId);


      setEditMode(false);
      setEditProductId(null);


      setTimeout(async () => {
        try {
          const { data: updatedData, error: fetchError } = await supabase
            .from('crud')
            .select('*')
            .eq('user_id', user.id);

          if (fetchError) {
            throw fetchError;
          }
          setproducts(updatedData);
          setname('');
          setquantity('');
          setprice('');
        } catch (error) {
          console.error('Error fetching updated data:', error.message);
        }
      }, 1000);
    } catch (error) {
      console.error('Error updating record:', error.message);
    }



  };


  const downloadProducts = async () => {
    if (!products) {
      console.error('No products data available.');
      return;
    }

    const format = prompt('Choose download format (csv, xlsx, json):');
    if (!format) return; 
  
    let content;
    switch (format.toLowerCase()) {
      case 'csv':
        
        content = products.map(product => Object.values(product).join(",")).join("\n");
        break;
      case 'xlsx':
        
        break;
      case 'json':
    
        content = JSON.stringify(products, null, 2);
        break;
      default:
        console.error('Invalid format:', format);
        return;
    }
 
    const blob = new Blob([content], { type: 'text/plain' }); 
  
  
    const filename = `products.${format.toLowerCase()}`;
    saveAs(blob, filename);
  };
  
  return (
    <>

      <Navbar />
      <div className="container w-100">
        <div className="inputs_field d-flex align-items-center justify-content-center row">
          <div className='col-md-3 col-sm-12'>
            <label className="form-label" for="username">
              Name
            </label>
            <input onChange={(e) => setname(e.target.value)} value={name} className="form-control" id="username" placeholder="Enter your name" type="text" required />
          </div>

          <div  className='col-md-3 col-sm-12'>
            <label className="form-label" for="username">
              Price
            </label>
            <input onKeyPress={(e) => {
              const allowedChars = /[0-9\b\r]/;
              if (!allowedChars.test(e.key)) {
                e.preventDefault();
              }
            }} onChange={(e) => setprice(e.target.value)} value={price} className="form-control" id="username" placeholder="Enter price" type="number" required />
          </div>

          <div  className='col-md-3 col-sm-12'>
            <label className="form-label" for="username">
              Quantity
            </label>
            <input onKeyPress={(e) => {

              const allowedChars = /[0-9\b\r]/;
              if (!allowedChars.test(e.key)) {
                e.preventDefault();
              }
            }} onChange={(e) => setquantity(e.target.value)} value={quantity} className="form-control" id="username" placeholder="Enter Quantity" type="number" required />
          </div>
          <div  className='col-md-3 col-sm-12'>

          {editMode ? (
            <button onClick={handleEditSubmit}>Edit</button>
          ) : (
            <button onClick={handlesubmit}>Add</button>
          )}
          </div>
        </div>
        <section>
          <div class="container py-2 mt-5">
            <table class="table text-center">
              <thead>
                <tr>
                  <th>Name </th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="showData">
                {products && products.map(productsitem => (
                  <tr className='mt-4'>
                    <th>{productsitem.name}</th>
                    <th>{productsitem.price}</th>
                    <th>{productsitem.Quantity}</th>
                    <th>
                      <button onClick={() => handleEdit(productsitem.id, productsitem.name, productsitem.price, productsitem.Quantity)} className='Edite_btn'>Edit</button>

                      <button onClick={() => handledelete(productsitem.id)} className='btn btn-danger waves-effect waves-light'>Delete</button>

                    </th>

                  </tr>
                ))}
              </tbody>

            </table>


            {products?.length === 0 ? '' : (
              <button onClick={downloadProducts}
                className='downloadbtn' >Download Products</button>
            )}
          </div>
        </section>
      </div>

    </>
  );
}
