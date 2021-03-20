import {Component} from 'react';
import List from "./List";


class AddForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            dir:[],
            item:{
                name:"",
                tel:""
            },
            isEditing:false,
            temp_index:null
        }

        this.handleChange = this.handleChange.bind(this)
        this.add = this.add.bind(this)
        this.delete = this.delete.bind(this)
        this.edit = this.edit.bind(this)
        this.update = this.update.bind(this)
        this.view = this.view.bind(this)
    }

    view(item){
        alert(
            `
            Name = ${item.name}
            Tel = ${item.tel}
            `
        )
    }


    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        let item = this.state.item;

        item[name] = value;

        this.setState({item:item})
    }


    add(e){
        e.preventDefault()
        let dir = this.state.dir;
        dir.push(this.state.item)
        this.setState({dir:dir, item:{name:"", tel:""}})
        console.log(this.state.dir)
    }

    edit(index){
        let item = this.state.dir[index]
        this.setState({item:item, isEditing:true, temp_index:index})
    }

    update(e){
        e.preventDefault()
        let dir = this.state.dir;
        dir[this.state.temp_index] = this.state.item

        this.setState({
            dir: dir,
            item:{
                name:"",
                tel:""
            },
            isEditing:false,
            temp_index:null
        })
    }


    delete(index){
        let dir = this.state.dir;
        dir.splice(index, 1)
        this.setState({dir:dir})
    }

    render(){
        return (
            <div className="col-md-6">
                <form method="POST" onSubmit={this.state.isEditing ? this.update : this.add}>
                    <div className="mb-2">
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            className="form-control"
                            value={this.state.item.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            type="text"
                            name="tel"
                            placeholder="Enter Phone"
                            className="form-control"
                            value={this.state.item.tel}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="mb-2">
                       <button className="btn btn-success" type="submit">
                           {this.state.isEditing ? "Update" : "Save"}
                       </button>
                    </div>
                </form>
                <List
                    dir={this.state.dir}
                    delete={this.delete}
                    edit={this.edit}
                    view={this.view}
                />
            </div>
        )
    }
}

export default AddForm;