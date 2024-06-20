// import logo from './logo.svg';
import './App.css';
import { gql , useQuery } from '@apollo/client';

// const query = `
//       getTodos {
//     title
//     completed
//     user {
//       name
//       phone
//       email
//     } 
//   }
// `

const query = gql`
query getalluser {
getTodos {
    title
    completed
    user {
      name
      phone
      email
    }
   
  }
}
`


function App() {
  const {loading, error , data } = useQuery(query);

  if(loading) return <h1>loading....</h1>
  if (error) return <p>Error : {error.message}</p>;

  console.log("data", data)
  return (
    <div className="App" >
      {/* {JSON.stringify(data)} */}

      <table>
             <tbody>
             <tr> 
              <td><h1>title of TODO : </h1></td> 
              <td><h1>CreateBy User : </h1></td>
        
             </tr>
               {
                         
                     data.getTodos.map(todo => <tr key={todo.id}>
                              <td>{todo.title}</td>       
                              <td>{todo?.user?.name}</td>       
                     </tr>)

               }

             </tbody>

      </table>

    
    </div>
  );
}

export default App;
