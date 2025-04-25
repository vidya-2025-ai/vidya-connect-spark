
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const certificates = [
  {
    id: 1,
    title: "Introduction to Research Methods",
    issuer: "Tech Research Labs",
    date: "2025-03-15",
    status: "Completed"
  },
  {
    id: 2,
    title: "Teaching Excellence Program",
    issuer: "Global Education Institute",
    date: "2025-02-28",
    status: "Completed"
  },
  {
    id: 3,
    title: "Community Leadership Certificate",
    issuer: "Community First",
    date: "2025-04-10",
    status: "In Progress"
  }
];

const Certificates = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Certificates</h1>
                <p className="mt-1 text-sm text-gray-600">
                  View and download your certificates
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certificates.map((certificate) => (
                <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-col space-y-1.5">
                    <h3 className="font-semibold">{certificate.title}</h3>
                    <p className="text-sm text-gray-600">{certificate.issuer}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Issued: {new Date(certificate.date).toLocaleDateString()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          certificate.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {certificate.status}
                        </span>
                      </div>
                      {certificate.status === 'Completed' && (
                        <Button className="w-full" variant="outline">
                          Download Certificate
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
