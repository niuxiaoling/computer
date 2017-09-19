
class Display extends React.Component{
    render(){
        let {num}=this.props;
        return(
            <div className="display">
                {num}
            </div>
    )
    }
}
class Audio extends React.Component{
    render(){
        return(
            <audio src="1.mp3"></audio>
        )
    }
}
class Keyboard extends  React.Component{
    render(){
        let {keys,fn,equal,ac,del,cal,build}=this.props;
        let lis=keys.map((v,i)=>(
            <li key={i} className={`${i==0||i==1||i==2||i==3||i==11||i==7||i==15||i==19?'active':''}`}>
               <div className="button button1"  onClick={()=> {
                   if (v.type === 'number') {
                       fn(v.name)
                   }else if(v.type==='o'){
                       cal(v.name)
                   } else if(v.type==='equal'){
                       equal()
                   }else if(v.type==='ac'){
                       ac()
                   }else if(v.type==='del'){
                       del()
                   }else if(v.type==='build'){
                       build()
                   }
               }

               }>{v.name}</div>
           </li>))
        return(
            <div className="keyboard">
            <ul>
               {lis}
            </ul>
            </div>
        )
    }
}

class Page extends  React.Component{
    constructor(){
        super();
        this.state={
            keys:[],
            //表达式
            express:'',
            //显示内容
            display:'0',
        }
        this.fn=this.fn.bind(this)
        this.equal=this.equal.bind(this)
        this.ac=this.ac.bind(this)
        this.del=this.del.bind(this)
        this.cal=this.cal.bind(this)
        this.build=this.build.bind(this)
    }
    componentDidMount(){
        this.setState({
            keys:[
                {name:'C',type:'ac'},
                {name:'del',type:'del'},
                {name:'%',type:'build'},
                {name:'/',type:'o'},
                {name:'7',type:'number'},
                {name:'8',type:'number'},
                {name:'9',type:'number'},
                {name:'*',type:'o'},
                {name:'4',type:'number'},
                {name:'5',type:'number'},
                {name:'6',type:'number'},
                {name:'-',type:'o'},
                {name:'1',type:'number'},
                {name:'2',type:'number'},
                {name:'3',type:'number'},
                {name:'+',type:'o'},
                {name:'0',type:'number'},
                {name:'.',type:'number'},
                {name:'+/-',type:'o'},
                {name:'=',type:'equal'}
            ]
        })
    }
    music(){
        const audio=document.querySelector('audio');
        audio.play();
        setTimeout(()=>{
            audio.pause();
            audio.currentTime=0;
        },300)
    }
    //点击显示
    fn(num){
        this.music();
       this.setState({
           express:this.state.express+num,
           display:this.state.express+num,
       })
    }
    cal(num){
        this.music();
        this.setState({
            express:this.state.display+num,
            display:this.state.display+num,
        })
    }
    equal(){
        this.music();
        var reg=/^[+-]?\d+(\.?\d{0,2})([%+*/-]?\d+(\.?\d{0,2}))+$/;
        if(reg.test(this.state.express)){
            let eva=eval(this.state.express)
            this.setState({
                express:'',
                display:eva
            })
        }
        const a=reg.test(this.state.express)
        console.log(a);
    }
    ac(){
        this.music();
      this.setState({
          express:'',
          display:'0'
      })
    }
    del(){
        this.music();
        const aa=this.state.express.slice(0,-1)
       this.setState({
           express:aa,
           display:aa
       })
    }
    build(){
        this.music();
        const aa=(this.state.express)/100;
        this.setState({
            express:aa,
            display:aa
        })
    }

    render(){
        let {display,keys}=this.state;
        return(
            <div className="container">
            <Display num={display} />
            <Keyboard  keys={keys} fn={this.fn} equal={this.equal} ac={this.ac} del={this.del} cal={this.cal} build={this.build}/>
            <Audio/>
            </div>
        )
    }
}
ReactDOM.render(<Page/>,document.querySelector('#app'))