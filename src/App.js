import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function App() {
  return (
    <div className="App d-flex min-vh-100">
      <div className="container-fluid flex-grow-1" style={{paddingLeft:"15px"}}>
        <div className="row h-100">
        <div className="col-2 d-flex flex-column p-0" style={{ width: "350px" }}>
            <div className="row align-items-center d-flex justify-content-center" style={{ height: "40px", background: "white" , }}>
              <div className="col-1 p-0">
                <img src="./smileyLogo.png" alt="Logo" style={{height: "40px", width: "40px"}}/>
              </div>
              <div className="col-6 p-0" style={{ fontSize: "14px", marginLeft:"15px" }}>
                Fluent Dialogue Messenger
              </div>
            </div>
            <div className="row d-flex justify-content-center" style={{ height: "85px" }}>
              <div className="row my-1 justify-content-center rounded-pill p-0" style={{ width: "320px", marginLeft:"0px" , marginRight:"0px" , boxShadow: "-4px 4px 10px rgba(0, 0, 0, 0.4)"}}>
                <div className="bg-info m-1 rounded-circle" style={{ height: "70px" , width: "70px" }}>1</div>
                <div className="bg-info m-1 rounded-circle" style={{ height: "70px" , width: "70px" }}>2</div>
                <div className="bg-info m-1 rounded-circle" style={{ height: "70px" , width: "70px" }}>3</div>
                <div className="bg-info m-1 rounded-circle" style={{ height: "70px" , width: "70px" }}>4</div>
              </div>
            </div>
            <div className="row flex-grow-1 justify-content-center" style={{}}>
              <div className="p-0 rounded" style={{width: "330px" ,  marginBottom: "15px" ,  marginTop: "10px" ,  marginRight: "15px" ,  marginLeft: "15px", boxShadow: "-4px 4px 10px rgba(0, 0, 0, 0.4)"}}>chats</div>
            </div>
          </div>
            <div className="col flex-grow-1 d-flex flex-column p-0" style={{ height: "100vh" }}>
              <div className=" p-0 rounded" style={{ marginBottom: "15px", marginTop: "15px", marginRight: "15px", marginLeft: "5px", flex: "1", boxShadow: "-4px 4px 10px rgba(0, 0, 0, 0.4)" }}>chat</div>
            </div>
        </div>
      </div>
    </div>
  );
}
export default App;
