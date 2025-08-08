interface ManagementTeamProps {
  data: any;
}

export default function ManagementTeam({ data }: ManagementTeamProps) {
  return (
    <div className="bg-surface rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <i className="fas fa-users mr-2 text-primary"></i>
        Management Team
      </h3>
      <div className="space-y-4">
        {data.managementTeam && data.managementTeam.length > 0 ? (
          data.managementTeam.map((member: any, index: number) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-gray-500"></i>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{member.name}</div>
                  <div className="text-sm text-gray-600">{member.position}</div>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-700">
                {member.background}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <i className="fas fa-users text-4xl mb-3"></i>
            <p>Management team information not available</p>
          </div>
        )}
      </div>
    </div>
  );
}
