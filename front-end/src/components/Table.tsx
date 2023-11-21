const Table = ({ columns, data, className, style }: any) => {
  return (
    <div className={`table-responsive ${className}`} style={style}>
      <table className="table table-striped table-hover table-bordered rounded-table shadow-table">
        <thead className="custom-header">
          <tr>
            {columns?.map((name: string, i: number) => {
              return (
                <th key={i} scope="col">
                  {name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((array: any, i: number) => {
            return (
              <tr key={i}>
                {array.map((item: any, i: number) =>
                  i === 0 ? (
                    <th scope="row">{item}</th>
                  ) : (
                    <td key={i}>{item}</td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
