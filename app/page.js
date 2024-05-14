import './page.css'


export default function Home() {
  return (
    <>
  
      <div className="container w-100">
        <div className="inputs_field d-flex align-items-center justify-center gap-5">
          <div>
            <label className="form-label" for="username">
              Name
            </label>
            <input className="form-control" id="username" placeholder="Enter your name" type="text" />
          </div>

          <div>
            <label className="form-label" for="username">
              Price
            </label>
            <input className="form-control" id="username" placeholder="Enter price" type="number" />
          </div>

          <div>
            <label className="form-label" for="username">
              Quantity
            </label>
            <input className="form-control" id="username" placeholder="Enter Quantity" type="number" />
          </div>
          <button>Add</button>
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

                </tbody>
            </table>
        </div>
    </section>
      </div>

    </>
  );
}
