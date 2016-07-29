/* Todo App Made In ReactJS */

var Todo = React.createClass({

  addItem: function () {
    if (this.state.inputValue.length === 0) return;
    this.setState({ items: [{ value: this.state.inputValue, done: false }].concat(this.state.items), inputValue: '' });
  },

  deleteItem: function (index) {
    var updatedItems = this.state.items;
    updatedItems.splice(index, 1);
    this.setState({ items: updatedItems });
  },

  archiveItems: function () {
    var updatedItems = this.state.items;
    updatedItems = updatedItems.filter(function (item) {
      return !item.done;
    });
    this.setState({ items: updatedItems });
  },

  inputOnChange: function (event) {
    this.setState({ inputValue: event.target.value });
  },

  toggleTodoState: function (index) {
    var updatedItems = this.state.items;
    updatedItems[index].done = !updatedItems[index].done;
    this.setState({ items: updatedItems });
  },

  getInitialState: function () {
    return {
      items: [
        { value: 'Buy Milk', done: false },
        { value: 'Feed the dog', done: false }
      ],
      inputValue: ''
    }
  },

  render: function () {
    return (
      <div className='todo-app'>
        <h1>Todo App Made In ReactJS</h1>
        <InputBar inputValue={this.state.inputValue} inputOnChange={this.inputOnChange} addItem={this.addItem}/>
        <ItemsList items={this.state.items} toggle={this.toggleTodoState} delete={this.deleteItem}/>
        <button type='button' className='btn-archive' onClick={this.archiveItems}><i className="fa fa-archive fa-lg"></i>Archive Done</button>
      </div>
    )
  }

});

var InputBar = React.createClass({
  render: function () {
    return (
      <div className='input-bar'>
        <input type='text' placeholder='New item' value={this.props.inputValue} onChange={this.props.inputOnChange}></input>
        <button type='button' className='btn-add' onClick={this.props.addItem}><span className="fa fa-pencil fa-lg"></span></button>
      </div>
    )
  }
});

var ItemsList = React.createClass({
  render: function () {
    var items = this.props.items, i = -1;
    var toggle = this.props.toggle;
    var remove = this.props.delete;
    return (
      <ul>

        {
          items.map(function (item) {
            i++;
            return (
              <Item key={i} data={item} data-index={i} toggle={toggle} delete={remove}/>
            )
          })
        }

      </ul>
    )
  }
});

var Item = React.createClass({
  render: function () {
    return (
      <li className={this.props.data.done ? 'item done' : 'item'}>
        <input type='checkbox' id={'checkbox-' + this.props['data-index']} checked={this.props.data.done} onChange={() => this.props.toggle(this.props['data-index'])}></input><label htmlFor={'checkbox-' + this.props['data-index']}><i className="fa fa-check fa-lg"></i></label>
        <span>{this.props.data.value}</span>
        <button type='button' onClick={() => this.props.delete(this.props['data-index'])}><i className="fa fa-trash fa-lg"></i></button>
      </li>
    )
  }
});

ReactDOM.render(<Todo/>, document.getElementById('app'));
