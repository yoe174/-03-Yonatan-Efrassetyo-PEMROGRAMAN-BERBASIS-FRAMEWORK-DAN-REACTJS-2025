import { useRouter } from "next/router";

const UserDetail = ({ user }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="flex-center text-xl">Loading...</div>;
  }

  const renderRow = (label, value) => (
    <tr>
      <td className="table-label">{label}</td>
      <td className="table-value">{value}</td>
    </tr>
  );

  return (
    <div className="flex-center bg-gray-100 p-6">
        <button 
            onClick={() => router.back()} 
            className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition px-3 py-1.5">
            Kembali
        </button>
      <div className="card">
        <h1 className="card-title">{user.name}</h1>
        <table className="custom-table">
          <tbody>
            {renderRow("Username", user.username)}
            {renderRow("Email", user.email)}
            {renderRow("Phone", user.phone)}
            {renderRow(
              "Website",
              <a href={`https://${user.website}`} className="link" target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
            )}
            {renderRow("Company", user.company.name)}
            {renderRow("Address", `${user.address.street}, ${user.address.city}`)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  const user = await res.json();

  return { props: { user } };
}

export default UserDetail;

