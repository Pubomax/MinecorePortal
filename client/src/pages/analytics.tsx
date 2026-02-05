import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getQueryFn } from "@/lib/queryClient";
import type { Consultation } from "@shared/schema";

export default function Analytics() {
  const { data: consultations = [], isLoading } = useQuery({
    queryKey: ["/api/consultations"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate analytics
  const totalSubmissions = consultations.length;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  
  const todaySubmissions = consultations.filter((c: Consultation) => 
    new Date(c.createdAt) >= todayStart
  ).length;

  const last7Days = consultations.filter((c: Consultation) => 
    new Date(c.createdAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  // Lead score distribution
  const leadScores = consultations.reduce((acc: Record<string, number>, c: Consultation) => {
    if (c.leadScore) {
      const grade = c.leadScore.charAt(0); // Get A, B, C, or D
      acc[grade] = (acc[grade] || 0) + 1;
    }
    return acc;
  }, {});

  // Industry breakdown
  const industries = consultations.reduce((acc: Record<string, number>, c: Consultation) => {
    acc[c.industry] = (acc[c.industry] || 0) + 1;
    return acc;
  }, {});

  // Revenue distribution
  const revenues = consultations.reduce((acc: Record<string, number>, c: Consultation) => {
    acc[c.revenue] = (acc[c.revenue] || 0) + 1;
    return acc;
  }, {});

  // Company size distribution
  const companySizes = consultations.reduce((acc: Record<string, number>, c: Consultation) => {
    acc[c.companySize] = (acc[c.companySize] || 0) + 1;
    return acc;
  }, {});

  // Budget analysis
  const budgets = consultations.reduce((acc: Record<string, number>, c: Consultation) => {
    acc[c.budget] = (acc[c.budget] || 0) + 1;
    return acc;
  }, {});

  // Timeline urgency
  const timelines = consultations.reduce((acc: Record<string, number>, c: Consultation) => {
    acc[c.timeline] = (acc[c.timeline] || 0) + 1;
    return acc;
  }, {});

  const getScoreColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-black mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track consultation form performance and lead quality metrics
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">{totalSubmissions}</div>
              <p className="text-sm text-gray-600 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">{todaySubmissions}</div>
              <p className="text-sm text-gray-600 mt-1">New submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Last 7 Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">{last7Days}</div>
              <p className="text-sm text-gray-600 mt-1">Weekly activity</p>
            </CardContent>
          </Card>
        </div>

        {/* Lead Quality */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Lead Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(leadScores).map(([grade, count]) => (
                  <div key={grade} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getScoreColor(grade)}>
                        Grade {grade}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{count}</span>
                      <span className="text-sm text-gray-600">
                        ({Math.round((count / totalSubmissions) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Industry Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(industries).slice(0, 6).map(([industry, count]) => (
                  <div key={industry} className="flex items-center justify-between">
                    <span className="capitalize">{industry.replace('-', ' ')}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{count}</span>
                      <span className="text-sm text-gray-600">
                        ({Math.round((count / totalSubmissions) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Metrics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(revenues).map(([revenue, count]) => (
                  <div key={revenue} className="flex items-center justify-between">
                    <span>{revenue}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{count}</span>
                      <span className="text-sm text-gray-600">
                        ({Math.round((count / totalSubmissions) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(companySizes).map(([size, count]) => (
                  <div key={size} className="flex items-center justify-between">
                    <span>{size}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{count}</span>
                      <span className="text-sm text-gray-600">
                        ({Math.round((count / totalSubmissions) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Intelligence */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Budget Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(budgets).map(([budget, count]) => (
                  <div key={budget} className="flex items-center justify-between">
                    <span>{budget}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{count}</span>
                      <span className="text-sm text-gray-600">
                        ({Math.round((count / totalSubmissions) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline Urgency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(timelines).map(([timeline, count]) => (
                  <div key={timeline} className="flex items-center justify-between">
                    <span className="capitalize">{timeline.replace('-', ' ')}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{count}</span>
                      <span className="text-sm text-gray-600">
                        ({Math.round((count / totalSubmissions) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultations.slice(0, 5).map((consultation: Consultation) => (
                <div key={consultation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold">{consultation.name}</div>
                    <div className="text-sm text-gray-600">{consultation.company} • {consultation.industry}</div>
                  </div>
                  <div className="text-right">
                    {consultation.leadScore && (
                      <Badge className={getScoreColor(consultation.leadScore.charAt(0))}>
                        {consultation.leadScore}
                      </Badge>
                    )}
                    <div className="text-sm text-gray-600 mt-1">
                      {new Date(consultation.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}