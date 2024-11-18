export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'supervisor' | 'internee';
  departmentId?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  supervisorId: string;
}

export interface Resource {
  id: string;
  type: 'workstation' | 'laptop' | 'id_card' | 'auditorium';
  name: string;
  details: {
    deskNumber?: string;
    boxNumber?: string;
    serialNumber?: string;
    location?: string;
  };
  status: 'available' | 'assigned' | 'maintenance';
  assignedTo?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  departmentId: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'review';
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  id: string;
  userId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'late' | 'absent' | 'half_day';
  notes?: string;
}

export interface PerformanceMetric {
  id: string;
  userId: string;
  evaluatorId: string;
  date: string;
  metrics: {
    productivity: number;
    quality: number;
    teamwork: number;
    communication: number;
    initiative: number;
  };
  overallScore: number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceStats {
  totalDays: number;
  presentDays: number;
  lateDays: number;
  absentDays: number;
  halfDays: number;
  averageCheckInTime: string;
  punctualityRate: number;
}