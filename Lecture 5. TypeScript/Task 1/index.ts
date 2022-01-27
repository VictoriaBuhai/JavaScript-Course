const container = document.getElementById("container")

interface IPost{
    body: string,
    id: number,
    userId:number,
    title:string   
}

const getPosts = async(url: string): Promise<IPost[]> =>{
return fetch(url).then((response)=>{
    return response.json();
})
}
const display = (post: IPost):void =>{
    const postTitle = document.createElement("p");
    postTitle.innerText = post.title;
    container.append(postTitle)
    
}
const posts = await getPosts("https://jsonplaceholder.typicode.com/posts");
posts.map(post => display(post));

console.log(posts);

