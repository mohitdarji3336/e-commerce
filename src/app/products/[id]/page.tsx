export default  async function Products ({params}: {params : {id: string } }) {
    const {id} = await  params;
    return (
        <div>
    <h1>Products: {id}</h1>
    <h2>Feature product section</h2>
    </div>
    )


}