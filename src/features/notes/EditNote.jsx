import { useParams } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";

useGetUsersQuery;

const EditNote = () => {
  const { id } = useParams();
  const { username, isManager, isAdmin } = useAuth();

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: Object.values(data?.entities),
    }),
  });

  if (!note || !users?.length) return <PulseLoader color="#FFF" />;

  if (!isManager && !isAdmin) {
    if (note.username !== username) return <p className="errmsg">No access!</p>;
  }

  return <EditNoteForm note={note} users={users} />;
};
export default EditNote;
