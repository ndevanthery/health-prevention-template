import imageError from '../images/Errorpage.jpg'

export default function Page404() {

    return (
        <>
            <h1 style={{marginLeft:"30%"}}>Ooops...
             page not found
           </h1>
            <img src={imageError} style={{width: "50%", marginLeft: "20%"}}/>
        </>
    );
}
