import { useRef, useState } from "react";

import "./App.css";
import data from "./Quiz/Quiz.json";
function App() {
  let [index, setIndex] = useState(0)
  const [alldata,setalldata] = useState(data[index])
  let [lock,setLock] = useState(false)
  const [result,setResult] = useState(false)
  let [score,setScore] = useState(0)

  let o1 = useRef(null);
  let o2 = useRef(null);
  let o3 = useRef(null);
  let o4 = useRef(null);

  let option_list =[o1,o2,o3,o4]
 
  const checkfn=(e,answer)=>{
    if(!lock){
      if(alldata.ans === answer){
        e.target.classList.add("correct")
        setScore((p)=>p+1)
        setLock(!lock)
       }
       else{
        e.target.classList.add("wrong")
        setLock(!lock)
        option_list[alldata.ans-1].current.classList.add("correct")
       }
    }
    
  };
  let next =()=>{ 
    if (!lock){
      if(index === data.length-1){
        setResult(true);
        return 0;
      }
     }
    
     
     setIndex(++index);
     setalldata(data[index])
     setLock(false)
     option_list.map((v)=>{
         v.current.classList.remove("correct")
         v.current.classList.remove("wrong")
         return null;
     });
    
     
  };

  return (
    <div className="container">
      <div className="main-container">
        <h1>Quiz App</h1>
        <hr />

        <>{result?<h1>Your score is {score} </h1>:
        <>
          <h3>{index + 1}. {alldata.question}</h3>
          <ul>
            <li ref={o1} onClick={(e)=> {checkfn(e,1)}}>{alldata.option1}</li>
            <li ref={o2} onClick={(e)=> {checkfn(e,2)}}>{alldata.option2}</li>
            <li ref={o3} onClick={(e)=> {checkfn(e,3)}}>{alldata.option3}</li>
            <li ref={o4} onClick={(e)=> {checkfn(e,4)}}>{alldata.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <p>{index+1} to {data.length} question</p>
        </>}
        
        </>
      </div>
    </div>
  );
}

export default App;
