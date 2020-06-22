export default function() {

	const onClick = async () => {
	
		const response = await fetch("/api/test"); 
		console.log(response); 

		if (response.status === 200){
			
			const todo = await response.json(); 
			console.log("fetched todo: ", todo); 
		}	
	}
	return <button onClick={onClick}>call test json placeholder</button>
}
