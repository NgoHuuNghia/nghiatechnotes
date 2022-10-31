import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="errmsg">{error?.data?.message}</p>;
  if (isSuccess) {
    const { ids } = notes;
    return (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Username
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {ids?.length
            ? ids.map((noteId) => <Note key={noteId} noteId={noteId} />)
            : null}
        </tbody>
      </table>
    );
  }
};
export default NotesList;
