import { useState } from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
export default function Addmovie({movieDetail,setDataMovie,setStatus})
{
    const[image,setImage]=useState("");
    const[overview,setOverview]=useState("");
    const[title,setTitle]=useState("");
    const[rating,setRating]=useState("");
    const[releaseDate,setReleaseDate]=useState("");
    const[statusform,setStatusForm]=useState(true);
    const handleFileChange = (event, setImage) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageContent = e.target.result;
          setImage(imageContent);
        };
        reader.readAsDataURL(selectedFile);
      };
    const handleSubmit=(e)=>
    {
        if(image===""||title===""||overview===""||rating===""||releaseDate==="")
        {
            alert("Input a field first");
            return;
        }
        if(rating<0||rating>11)
        {
            alert("Rating should not be more than 10 of less than 1");
            return;
        }
        alert("Movie added Successfully");
        const newMovie = {
            backdrop_path:image,
            video:true,
            original_title:title,
            overview:overview,
            vote_average:rating,
            release_date:releaseDate
        }
        setStatus(true);
        setStatusForm(false);
        e.preventDefault();
        setDataMovie([...movieDetail, newMovie]);
    }
    return(
        <div>
        {statusform&&
         <form className="row g-1 border border-2 border-white rounded-2 m-auto w-50 bg-transparent" onSubmit={handleSubmit}>
        <h1 className="text-center text-black">Add Movies</h1><hr className="text-black"/>
        <div class="mb-1 flex-nowrap">
        <label for="formFile" class="form-label text-white">
          Choose Image
        </label><br></br>
        <input class="form-control w-50 d-inline" type="file" required id="formFile"onChange={(e)=>{handleFileChange(e,setImage)}}/>
      </div>
      <div class="mb-1">
        <label for="exampleFormControlInput1" class="form-label text-white">
        Movie Title:
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          onChange={(e)=>{
            setTitle(e.target.value);
          }}
          required
        />
      </div>
      <div class="mb-1">
        <label for="exampleFormControlInput2" class="form-label text-white">
        Overview of Movie:
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput2"
          onChange={(e)=>{
            setOverview(e.target.value);
          }}
          required
        />
      </div>
      <div class="mb-2">
        <label for="exampleFormControlInput3" class="form-label text-white">
        Rating of Movie:
        </label>
        <input
          type="number"
          class="form-control"
          id="exampleFormControlInput3"
          onChange={(e)=>{
            setRating(e.target.value);
          }}
          required
        />
      </div>
      <div class="mb-2">
        <label for="exampleFormControlInput3" class="form-label text-white">
        Release Date:
        </label>
        <input
          type="date"
          class="form-control"
          id="exampleFormControlInput3"
          onChange={(e)=>{
            setReleaseDate(e.target.value);
          }}
          required
        />
      </div>
      <button type="submit" class="btn m-lg-auto btn-dark w-75">Sumbit Movie Description</button>
    </form>}
        </div>
    );
};