/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "./models/Movie";
import routes from "./routes";
import {} from "./movieRouter";
// Add your magic here!



export const home = async (req,res)=> {
    try{
        const movies = await Movie.find({}).sort({ _id: -1 });
        res.render("home", { pageTitle: "Home", movies });
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
};

export const search = async(req,res)=>{
    const {
        query: { rating, year }
      } = req;
    const searchingBy ="";
    let movies= [];
    try {
        if(year){
        movies = await Movie.find({
          "year": { $eq: year}
        });
        console.log(year);
        console.log(movies);
        console.log("here");
        searchingBy= "year";
        res.render("search", { pageTitle: "Search", searchingBy, movies});
    }else if(rating){
        movies= await Movie.find({
          "rating": { $gte: rating}
        });
        searchingBy="rating";
        res.render("search", { pageTitle: "Search", searchingBy, movies});
    }else{res.status(404);} 
        }catch (error) {
        res.status(404);
          } 
};




export const createMovie = (req,res)=>{
        return res.render("create", {pageTitle: "create"});
};

export const postMovie= async (req,res)=> {
    const {
        body: {title,year,rating
            ,synopsis,genres,uploadedAt}
    }=req;
    const movie = await Movie.create({
        title,
        year,
        rating,
        synopsis,
        genres:genres.split(","),
        //꺄....해결했다...!🥰
        uploadedAt
    });
    //맞나?! 나중에 다시 보기,,
        res.redirect(routes.detail(movie.id));
}; 

export const detailMovie = async(req,res)=>{
    const {
        params: {id}
    }=req;
    console.log(movie);
    const movie= await Movie.findById(id);
    console.log(movie);
    res.render("detail", {pageTitle: "detail" ,movie});
   
};


export const getEditMovie =async(req,res)=>{
    const {
        params: {id}
    }=req;
    try {
        const movie = await Movie.findById(id);
        console.log(movie);
        res.render("edit", { pageTitle: `Edit ${movie.title}`, movie });
      } catch (error) {

        res.redirect(routes.home);
      }
    };
export const postEditMovie =async(req,res)=>{
    const{
        params:{id},
        body: {title,
            year,
            rating,
            synopsis,
            genres}
    }=req;
    try{
        //findOneAndUpdate 특정 obj 찾으라고 하눈거,,,첨 method 잘못 씀,,
        await Movie.findByIdAndUpdate( id, {
            title,year,rating,synopsis,
            genres : genres.split(".")});
        res.redirect(routes.detail(id));
    }catch(error){
        res.redirect(routes.home);
    }
};

// post 


export const deleteMovie = async(req,res)=>{
    const{
        params: {id}
    }=req;
        await Movie.findOneAndRemove({_id:id});
        res.redirect(routes.home);
};



