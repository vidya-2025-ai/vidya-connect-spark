
import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { certificateService } from '@/services/api/certificateService';
import { Certificate } from '@/services/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from '@/components/ui/use-toast';

const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setIsLoading(true);
        const data = await certificateService.getAllCertificates();
        setCertificates(data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
        toast({
          title: "Error",
          description: "Failed to load certificates. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Certificates</h1>
                  <p className="mt-1 text-sm text-gray-600">View and download your certificates</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-col space-y-1.5">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-4 w-1/3" />
                          <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-8 w-full" />
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
  }

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

            {certificates.length === 0 ? (
              <Card className="text-center p-6">
                <p className="mb-2 text-gray-600">No certificates found</p>
                <p className="text-sm text-gray-500">
                  Complete courses or assessments to earn certificates
                </p>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {certificates.map((certificate) => (
                  <Card key={certificate._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-col space-y-1.5">
                      <h3 className="font-semibold">{certificate.title}</h3>
                      <p className="text-sm text-gray-600">{certificate.issuer}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Issued: {new Date(certificate.issueDate).toLocaleDateString()}
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
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={() => window.open(certificate.credentialUrl || '#', '_blank')}
                            disabled={!certificate.credentialUrl}
                          >
                            Download Certificate
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
