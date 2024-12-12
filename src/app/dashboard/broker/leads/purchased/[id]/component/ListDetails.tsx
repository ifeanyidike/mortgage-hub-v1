import { KeenIcon } from "@/app/dashboard-components";
import { toAbsoluteUrl } from "@/app/utils";

interface IListItem {
  status: string;
  logo?: boolean;
  info: string | number;
}
interface IListItems extends Array<IListItem> {}

type Props = {
  tables: IListItems;
  title: string;
};
const ListDetails = (props: Props) => {
  const { tables, title } = props;

  const renderItem = (table: IListItem, index: number) => {
    return (
      <tr key={index} className="w-full">
        <td className="text-sm text-gray-600 min-w-36 pb-8 pe-6">
          {table.status}
        </td>
        <td className="flex items-center gap-2.5 text-sm text-gray-800 ml-auto">
          {table.logo && (
            <img
              src={toAbsoluteUrl("/media/brand-logos/visa.svg")}
              className="w-10 shrink-0"
              alt=""
            />
          )}

          {table.info}
        </td>
      </tr>
    );
  };

  return (
    <div className="card grow">
      <div className="card-header !h-20">
        <h3 className="card-title">{title}</h3>

        {/* <button className="btn btn-light btn-sm">
          <KeenIcon icon="exit-down" />
          Download PDF
        </button> */}
      </div>

      <div className="card-body pt-4 pb-3">
        <table className="table-auto w-full">
          <tbody className="w-full">
            {tables.map((table, index) => {
              return renderItem(table, index);
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListDetails;
