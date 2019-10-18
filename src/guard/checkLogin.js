export const checkLogin=()=>
{
    const token=localStorage.getItem("token");
    return token==null ? false : true;
}