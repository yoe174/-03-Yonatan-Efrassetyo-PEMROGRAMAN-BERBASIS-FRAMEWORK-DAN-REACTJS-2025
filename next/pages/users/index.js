import Link from "next/link";

const Users = ({ users }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg ">
            <h1 className="text-2xl font-bold mb-4 text-center text-black">Daftar Pengguna</h1>
            <ul className="w-full">
              {users.map((user) => (
                <li key={user.id} className="bg-gray-100 hover:bg-blue-200 rounded-lg p-3 mb-2">
                  <Link href={`/users/${user.id}`} className="text-blue-600 font-semibold">
                    {user.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
};

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
}

export default Users;
