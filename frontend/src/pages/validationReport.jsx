import { useLocation, useNavigate } from 'react-router-dom';
import '../stylesheets/InvoiceRendered.css'

// Renders the validation report in a separate page
const ValidationReport = () => {
    const location = useLocation();
    let data = location.state;
    // downloads the JSON into the user's computer
    function downloadJson() {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;

        link.download = 'validation-report.json';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    const navigate = useNavigate();

    // navigate back to validation Page
    function goBack() {
        navigate('/invoiceValidation');
    }

    return (
        <div className='report-container'>
        <div className='validation-report'>
          <button onClick={goBack} className="backButton">Back</button>
          <h2 className='report-title'>Validation Report</h2>
          <p className='index-container'>
            <span className='report-index'>Format: </span>
            {data.format}
          </p>
          <p className='index-container'>
            <span className='report-index'>Issue Date: </span>
            {data["issueDate (YYYY-MM-DD)"]}
          </p>
          <p className='index-container'>
            <span className='report-index'>Successful: </span>
            {data.successful ? 'Yes' : 'No'}
          </p>
          <p className='index-container'>
            <span className='report-index'>Summary: </span>
            {data.summary}
          </p>
          <p className='index-container'>
            <span className='report-index'>Total Error Count: </span>
            {data.totalErrorCount}
          </p>
          <hr className='solid'></hr>
          <h2 className='report-results'>Results</h2>
          <div>
            {Object.entries(data.results).map(([key, result]) => (
              <div key={key}>
                <h3>{key}</h3>
                <p ><span className='report-index'>Successful: </span> {result.successful ? 'Yes' : 'No'}</p>
                <p>{result.summary}</p>
                {result.errorCodes.length > 0 && (
                  <>
                    <h4>Error Codes</h4>
                    <ul>
                      {result.errorCodes.map((code, index) => (
                        <li key={index}>{code}</li>
                      ))}
                    </ul>
                  </>
                )}
                {result.errors.length > 0 && (
                  <>
                    <h4>Errors</h4>
                    {result.errors.map((error, index) => (
                      <div key={index}>
                        <p><span className='error-index'>Error ID:</span> {error.id}</p>
                        <p><span className='error-index'>Breached Rule:</span> {error.breached_rule}</p>
                        <p className='error-location'>
                          <span className='error-index'>Location: </span>
                          <ul>
                            <pre><code>{error.location}</code></pre>
                          </ul>
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
            <button className='report-download' onClick={downloadJson}>Download JSON Report</button>
        </div>
      </div>
    )
}

export default ValidationReport;