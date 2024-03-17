export default function BookHolder({ books }) {
  return (
    <div className="p-[1rem] flex gap-[1rem]">
      {books.map((book) => (
        <div className="flex flex-col" key={book.id}>
          <img src={book.cover} alt="" />
          <div>{book.title}</div>
          <div>{book.position}</div>
        </div>
      ))}
    </div>
  );
}
