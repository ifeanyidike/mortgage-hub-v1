import { PurchaseData } from "@/types/general";

interface IAboutTable {
  status: string;
  info: string;
}
interface IAboutTables extends Array<IAboutTable> {}

type Props = {
  data: PurchaseData | null;
};
const About = (props: Props) => {
  const data = props.data;
  const tables: IAboutTables = [
    {
      status: "Date of birth",
      info: data?.dob ? new Date(data.dob).toDateString() : "",
    },
    { status: "Address:", info: data?.location?.address || "" },
    { status: "City:", info: data?.location?.city || "" },
    { status: "Province:", info: data?.location?.province || "" },
    { status: "Postcode:", info: data?.postal_code || "" },
    { status: "Phone:", info: data?.phone || "" },
    {
      status: "Email:",
      info: `<a href="#" class="text-gray-800 hover:text-primary-active">${data?.email}</a>`,
    },
  ];

  const renderTable = (table: IAboutTable, index: number) => {
    return (
      <tr key={index}>
        <td className="text-sm text-gray-600 pb-3.5 pe-3">{table.status}</td>
        <td
          className="text-sm text-gray-900 pb-3.5"
          dangerouslySetInnerHTML={{ __html: table.info }}
        />
      </tr>
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">About</h3>
      </div>

      <div className="card-body pt-4 pb-3">
        <table className="table-auto">
          <tbody>
            {tables.map((table, index) => {
              return renderTable(table, index);
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { About, type IAboutTable, type IAboutTables };
