import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, AlertTriangle, CreditCard, Lock, CheckCircle, Info, Download, Home, BookOpen, BarChart3 } from 'lucide-react'

const VehicleCheck = () => {
  const [registration, setRegistration] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  // Mock data for limited view (before payment)
  const getLimitedData = () => {
    if (!registration) return null
    return {
      make: 'BMW',
      model: '3 Series',
      year: '2020',
      color: 'Black',
      bodyType: 'Saloon',
      firstRegistered: 'March 2020',
      engineCapacity: '2.0L',
      transmission: 'Automatic',
    }
  }

  // Mock data for full report (after payment)
  const getFullData = () => {
    if (!registration) return null
    return {
      ...getLimitedData(),
      vin: 'WBA3A5C5XJ1234567',
      engineNumber: 'N20B20A123456',
      co2Emissions: '156 g/km',
      environmentalReport: 'Euro 6',
      previousOwners: 2,
      mileageHistory: 'Consistent',
      colorChanges: 0,
      outstandingFinance: 'None',
      insuranceWriteOff: 'None',
      stolenStatus: 'Not stolen',
      imported: false,
      exported: false,
      dataGuarantee: 'Up to £30,000',
      reportDate: 'Today',
    }
  }

  const handleSearch = async () => {
    if (!registration.trim()) return
    
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setIsPaid(true)
      setShowPaymentModal(false)
    }, 1500)
  }

  // Color variants for dynamic classes (following the guide)
  const alertVariants = {
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tailwind Test - This should show a red background if Tailwind is working */}
      <div className="bg-red-500 text-white p-2 text-center text-sm">
        🎉 Tailwind CSS is working! This red bar should be visible.
      </div>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Search className="w-6 h-6 text-driveever-blue" />
              <h1 className="text-2xl font-bold text-driveever-blue">DriveEver</h1>
            </div>
            <p className="text-sm text-gray-600">Vehicle History Check</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Vehicle History Check
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Protect yourself from hidden problems and make informed decisions with our comprehensive vehicle history reports.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter vehicle registration (e.g., AB12 CDE)"
                    value={registration}
                    onChange={(e) => setRegistration(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 text-lg font-semibold text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-driveever-blue focus:border-transparent"
                  />
                  <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="w-full bg-driveever-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-driveever-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Searching...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        <span>Check Vehicle</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Navigation */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
            <Link to="/top-gear" className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
              <BookOpen className="w-4 h-4 mr-2" />
              Top Gear Blog
            </Link>
            <Link to="/learner-dashboard" className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
              <BarChart3 className="w-4 h-4 mr-2" />
              Learner Dashboard
            </Link>
            <Link to="/dashboard" className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
              <BarChart3 className="w-4 h-4 mr-2" />
              Main Dashboard
            </Link>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Check Your Vehicle?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                1 IN 10 VEHICLES WERE RECORDED AS AN INSURANCE WRITE OFF*
              </h3>
              <p className="text-gray-600">
                Don't buy a vehicle with hidden damage history
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                1 IN 8 VEHICLES HAD OUTSTANDING FINANCE RECORDED*
              </h3>
              <p className="text-gray-600">
                Avoid inheriting someone else's financial obligations
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                79,390 VEHICLES WERE REPORTED AS STOLEN IN 2020*
              </h3>
              <p className="text-gray-600">
                Ensure you're not buying stolen property
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center mt-8">
            *Source: DVLA and Police National Computer data
          </p>
        </div>

        {/* Results Section */}
        {registration && (
          <div>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-driveever-blue mx-auto mb-4"></div>
                  <p>Searching vehicle database...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Limited Data (Before Payment) */}
                {!isPaid && (
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          {getLimitedData()?.make} {getLimitedData()?.model} {getLimitedData()?.engineCapacity} {getLimitedData()?.transmission} Euro 6 5dr {getLimitedData()?.year}
                        </h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">Registration</p>
                            <p className="text-lg font-bold">{registration}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">Body type</p>
                            <p className="text-lg font-bold">{getLimitedData()?.bodyType}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">Colour</p>
                            <p className="text-lg font-bold">{getLimitedData()?.color}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">First registered</p>
                            <p className="text-lg font-bold">{getLimitedData()?.firstRegistered}</p>
                          </div>
                        </div>

                        <div className={`p-4 rounded-lg border ${alertVariants.info} mb-6`}>
                          <div className="flex items-start">
                            <Info className="w-5 h-5 mr-2 mt-0.5" />
                            <div>
                              <p className="font-bold">Limited data shown</p>
                              <p className="text-sm mt-1">
                                To view the complete vehicle history report including finance checks, 
                                insurance write-offs, mileage history, and more, please purchase the full report.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <button
                            onClick={() => setShowPaymentModal(true)}
                            className="w-full max-w-md bg-driveever-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-driveever-blue focus:ring-offset-2 flex items-center justify-center space-x-2"
                          >
                            <Lock className="w-5 h-5" />
                            <span>Purchase Full Report - £3.99</span>
                          </button>
                          
                          <div className="flex flex-wrap justify-center gap-8">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm">Up to £30,000 data guarantee</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Info className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">27 point independent report</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Search className="w-4 h-4 text-purple-500" />
                              <span className="text-sm">Over 15,000 checks completed per month</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Full Report (After Payment) */}
                {isPaid && (
                  <div className="max-w-6xl mx-auto space-y-8">
                    <div className={`p-4 rounded-lg border ${alertVariants.success}`}>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 mt-0.5" />
                        <div>
                          <p className="font-bold">Payment Successful!</p>
                          <p className="text-sm mt-1">You now have access to the complete vehicle history report.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                          Complete Vehicle History Report
                        </h2>
                        <p className="text-gray-600">
                          Our comprehensive vehicle check provides detailed information about the vehicle's history, 
                          specifications, and potential issues to help you make an informed decision.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Key Information */}
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-4">Key Information</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Make & Model</span>
                              <span className="font-bold">{getFullData()?.make} {getFullData()?.model}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Year</span>
                              <span className="font-bold">{getFullData()?.year}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Engine</span>
                              <span className="font-bold">{getFullData()?.engineCapacity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Transmission</span>
                              <span className="font-bold">{getFullData()?.transmission}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Body Type</span>
                              <span className="font-bold">{getFullData()?.bodyType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Colour</span>
                              <span className="font-bold">{getFullData()?.color}</span>
                            </div>
                          </div>
                        </div>

                        {/* Mileage and History */}
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-4">Mileage & History</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Mileage History</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">{getFullData()?.mileageHistory}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Previous Owners</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">{getFullData()?.previousOwners}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Colour Changes</span>
                              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">{getFullData()?.colorChanges}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Outstanding Finance</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">{getFullData()?.outstandingFinance}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Insurance Write-off</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">{getFullData()?.insuranceWriteOff}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Stolen Status</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">{getFullData()?.stolenStatus}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Specification</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Make</span>
                              <span className="font-bold">{getFullData()?.make}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Model</span>
                              <span className="font-bold">{getFullData()?.model}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Fuel Type</span>
                              <span className="font-bold">Petrol</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Body Type</span>
                              <span className="font-bold">{getFullData()?.bodyType}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Engine Capacity</span>
                              <span className="font-bold">{getFullData()?.engineCapacity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Year of Manufacture</span>
                              <span className="font-bold">{getFullData()?.year}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date First Registered</span>
                              <span className="font-bold">{getFullData()?.firstRegistered}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">CO2 Emissions</span>
                              <span className="font-bold">{getFullData()?.co2Emissions}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Environmental Report</span>
                              <span className="font-bold">{getFullData()?.environmentalReport}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-8 mt-8 bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Vehicle Data</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">VIN Confirmation</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">Verified</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Engine Number</span>
                              <span className="font-bold text-sm">{getFullData()?.engineNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Registration</span>
                              <span className="font-bold">{registration}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Data Guarantee</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">{getFullData()?.dataGuarantee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Report Date</span>
                              <span className="font-bold">{getFullData()?.reportDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 space-y-4">
                        <button className="w-full max-w-md bg-driveever-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-driveever-blue focus:ring-offset-2">
                          View Sample Report
                        </button>
                        <button className="w-full max-w-md border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-semibold hover:bg-gray-50 focus:ring-2 focus:ring-driveever-blue focus:ring-offset-2 flex items-center justify-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Download PDF Report</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Purchase Vehicle Report</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-bold">Vehicle Check Report</span>
                    <span className="font-bold text-lg">£3.99</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-600 text-center">
                    This report includes comprehensive vehicle history, finance checks, 
                    insurance write-offs, mileage verification, and more.
                  </p>

                  <button
                    onClick={handlePayment}
                    className="w-full bg-driveever-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-driveever-blue focus:ring-offset-2 flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-5 h-5" />
                    <span>Pay £3.99 - Get Full Report</span>
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Secure payment processing. Money-back guarantee if not satisfied.
                  </p>
                </div>

                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full text-gray-500 py-2 px-4 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VehicleCheck