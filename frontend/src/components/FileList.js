function FileList({ files }) {
  return (
    <>
      <div className="file-list">
        <table>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>Sl No</th>
              <th>File Name</th>
              <th>File Type</th>
              <th style={{ width: "12%" }}>Size</th>
              <th>Modified Date</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="fixed-cell">{file.name}</td>
                <td>{file.type}</td>
                <td>{`${(file.size / (1024 * 1024)).toFixed(2)} MB`}</td>
                <td>
                  {new Date(file.lastModified).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FileList;
