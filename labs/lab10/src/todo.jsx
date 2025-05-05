export default function ToDoList({ name }) {
    const toDo = ["Get up", "Go to work", "Come home", "Internet", "Sleep"];
    const listItems = toDo.map(item => <li key={item}>{ item }</li>);

    return (
        <>
        <h2>Hello {name}!</h2>
        <ol>
            {listItems}
        </ol>
        </>
    )
}