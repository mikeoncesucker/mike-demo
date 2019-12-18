import { defineMessages } from "react-intl";

const tabs = defineMessages({
  title: {
    id: "title",
    defaultMessage: "UCSP Technical Center"
  },
  cockpit_title: {
    id: "cockpit.title",
    defaultMessage: "Dashboard"
  },
  center_title: {
    id: "center.title",
    defaultMessage: "Data center"
  },
  topology_title: {
    id: "topology.title",
    defaultMessage: "Topology"
  },
  gateway_title: {
    id: "gateway.title",
    defaultMessage: "API-GW"
  },
  pasS_title: {
    id: "pasS.title",
    defaultMessage: "PaaS-HW"
  },
  sysRelation_title: {
    id: "sysRelation.title",
    defaultMessage: "System-Relations"
  },
  backstage_title: {
    id: "backstage.title",
    defaultMessage: "BG-MGMT"
  },
});

const common = defineMessages({
  last_week: {
    id: "last.week",
    defaultMessage: "(Last 7 days)"
  },
  number: {
    id: "number",
    defaultMessage: "PCS"
  },
  no_data: {
    id: "no.data",
    defaultMessage: "No data"
  }
});

const apiGateway = defineMessages({
  api_situation: {
    id: "API.Situation",
    defaultMessage: "Inter-system API Calls Situation"
  },
  api_all_system_calls: {
    id: "API.allSystemCalls",
    defaultMessage: "All System Calls"
  },
  api_details: {
    id: "API.details",
    defaultMessage: "Inter-system API Calls details"
  },
  api_calls_trend: {
    id: "API.callsTrend",
    defaultMessage: "Trend Of Data Calls times"
  },
  api_percentage_analysis: {
    id: "API.percentageAnalysis",
    defaultMessage: "Calls Percentage Analysis"
  },
  api_module_name: {
    id: "API.moduleName",
    defaultMessage: "Module Name"
  },
  api_path_name: {
    id: "API.pathName",
    defaultMessage: "Path Name"
  },
  api_request_method: {
    id: "API.requestMethod",
    defaultMessage: "Request Methods"
  },
  api_start_time: {
    id: "API.startTime",
    defaultMessage: "Start Time"
  },
  api_response_time: {
    id: "API.responseTime",
    defaultMessage: "Response Time"
  },
  api_response_code: {
    id: "API.responseCode",
    defaultMessage: "Response Code"
  },
  api_PCS: {
    id: "API.PCS",
    defaultMessage: "times"
  },
  api_successful_calls: {
    id: "API.successfulCalls",
    defaultMessage: "Successful Calls"
  },
  api_failed_calls: {
    id: "API.failedCalls",
    defaultMessage: "Failed Calls"
  },
  api_total_calls: {
    id: "API.totalCalls",
    defaultMessage: "Total Calls"
  },
  api_success: {
    id: "API.success",
    defaultMessage: "Success"
  },
  api_fail: {
    id: "API.fail",
    defaultMessage: "Fail"
  },
  api_totals: {
    id: "API.totals",
    defaultMessage: "Totals"
  },
  api_failure_details: {
    id: "API.failureDetails",
    defaultMessage: "Failure Dateils"
  },
  api_name: {
    id: "API.name",
    defaultMessage: "API Name"
  },
  common_interface: {
    id: "common",
    defaultMessage: "Common Interface"
  }
});

const dataCenter = defineMessages({
  center_service_detail: {
    id: "center.servie.detail",
    defaultMessage: "Service function details"
  },
  center_login_number: {
    id: "center.login.number",
    defaultMessage: "Login"
  },
  center_user_number: {
    id: "center.user.number",
    defaultMessage: "Users"
  },
  center_support_number: {
    id: "center.support.number",
    defaultMessage: "Supporting systems"
  },
  center_transfers_number: {
    id: "center.transfers.number",
    defaultMessage: "Number of transfers (Last week)"
  },
  center_data_sharing: {
    id: "center.data.sharing",
    defaultMessage: "Data sharing overview"
  },
  center_share_number: {
    id: "center.share.number",
    defaultMessage: "Number of data sharing"
  },
  center_business_data: {
    id: "center.data",
    defaultMessage: "Business data"
  },
  center_share_percent: {
    id: "center.share.percent",
    defaultMessage: "Data sharing percentage"
  },
  center_exhibitions_number: {
    id: "center.exhibitions.number",
    defaultMessage: "Exhibitions"
  },
  center_order_number: {
    id: "center.order.number",
    defaultMessage: "Orders"
  },
  center_event_number: {
    id: "center.event.number",
    defaultMessage: "Eevents"
  },
  center_pay_number: {
    id: "center.pay.number",
    defaultMessage: "Payments"
  },
});

const cockpit = defineMessages({
  systemMetrics: {
    id: "cockpit.systemMetrics",
    defaultMessage: "System metrics"
  },
  TotalServicesNum: {
    id: "cockpit.TotalServicesNum",
    defaultMessage: "Services"
  },
  TotalNumContainers: {
    id: "cockpit.TotalNumContainers",
    defaultMessage: "Containers"
  },
  subsystemsNum: {
    id: "cockpit.subsystemsNum",
    defaultMessage: "subsystems"
  },
  onlineServersNum: {
    id: "cockpit.onlineServersNum",
    defaultMessage: "Online servers"
  },
  apiNum: {
    id: "cockpit.apiNum",
    defaultMessage: "APIs"
  },
  apiCallsNum: {
    id: "cockpit.apiCallsNum",
    defaultMessage: "API calls"
  },
  successApiCallNum: {
    id: "cockpit.successApiCallNum",
    defaultMessage: "Success API calls"
  },
  failedApiCallNum: {
    id: "cockpit.failedApiCallNum",
    defaultMessage: "Failed API calls"
  },
  iaasData: {
    id: "cockpit.iaasData",
    defaultMessage: "IaaS performance data"
  },
  cpuUtilization: {
    id: "cockpit.cpuUtilization",
    defaultMessage: "CPU utilization"
  },
  memoryUtilization: {
    id: "cockpit.memoryUtilization",
    defaultMessage: "Memory utilization"
  },
  discUtilization: {
    id: "cockpit.discUtilization",
    defaultMessage: "Disc utilization"
  },
  netUtilization: {
    id: "cockpit.netUtilization",
    defaultMessage: "Network utilization"
  },
  apiCallsAnalysic: {
    id: "cockpit.apiCallsAnalysic",
    defaultMessage: "API calls analysis"
  },
  Uptime: {
    id: "cockpit.uptime",
    defaultMessage: "Uptime"
  },
  restartsNum: {
    id: "cockpit.restartsNum",
    defaultMessage: "Restarts"
  },
  containersNum: {
    id: "cockpit.containersNum",
    defaultMessage: "Containers"
  },
  total: {
    id: "cockpit.total",
    defaultMessage: "Total"
  },
  used: {
    id: "cockpit.used",
    defaultMessage: "Used"
  },
  service: {
    id: "cockpit.service",
    defaultMessage: "Service"
  },
  partition: {
    id: "cockpit.partition",
    defaultMessage: "Partition"
  },
  node: {
    id: "cockpit.node",
    defaultMessage: "Node"
  },
  times: {
    id: "cockpit.times",
    defaultMessage: "Times"
  },
  core: {
    id: "cockpit.core",
    defaultMessage: "core"
  },
  lastSevenDays: {
    id: "cockpit.lastSevenDays",
    defaultMessage: "Statistics for the last seven days"
  }
});

const paasHardware = defineMessages({
  systemResources: {
    id: "paasHardware.systemResources",
    defaultMessage: "System resources"
  },
  resourceOccupancyDetails: {
    id: "paasHardware.resourceOccupancyDetails",
    defaultMessage: "Resource utilization details"
  },
  runningServicesPercentage: {
    id: "paasHardware.runningServicesPercentage",
    defaultMessage: "Running services percentage"
  },
  paasHardware_records: {
    id: "paasHardware.records",
    defaultMessage: "piece"
  },
  paasHardware_service_number: {
    id: "paasHardware.service.number",
    defaultMessage: "Total"
  },
  restartsAnalysisNum: {
    id: "paasHardware.restartsAnalysisNum",
    defaultMessage: "Restarts analysis"
  },
  analysisToDate: {
    id: "paasHardware.analysisToDate",
    defaultMessage: "Statistical system started to date"
  },
  receive: {
    id: "paasHardware.receive",
    defaultMessage: "Receive"
  },
  send: {
    id: "paasHardware.send",
    defaultMessage: "Send"
  },
  noData: {
    id: "paasHardware.noData",
    defaultMessage: "No data"
  }
});

export { tabs, common, apiGateway, cockpit, dataCenter, paasHardware };
