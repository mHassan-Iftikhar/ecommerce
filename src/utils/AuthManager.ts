interface User {
  id: string | number;
  username: string;
  email: string;
  loginTime: string;
}

export class AuthManager {
  private static readonly AUTH_KEY = 'currentUser';
  private static readonly ADMIN_EMAIL = 'hassan@admin.panel';
  private static readonly ADMIN_PASSWORD = '1234567890';

  static setAuth(userData: User): void {
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(userData));
  }

  static getCurrentUser(): User | null {
    const userData = localStorage.getItem(this.AUTH_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  static isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.email === this.ADMIN_EMAIL;
  }

  static logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  static validateLogin(email: string, password: string): { success: boolean; user?: User; error?: string } {
    // Validation
    if (!email.trim() || !password.trim()) {
      return { success: false, error: "All fields are required" };
    }

    // Check for admin login
    if (email === this.ADMIN_EMAIL && password === this.ADMIN_PASSWORD) {
      const adminData: User = {
        id: 'admin',
        username: 'Admin',
        email: this.ADMIN_EMAIL,
        loginTime: new Date().toISOString()
      };
      return { success: true, user: adminData };
    }

    // Check for regular user login
    const usersArray = JSON.parse(localStorage.getItem("user") || "[]");
    const userExist = usersArray.find((user: any) => 
      user.email === email && user.password === password
    );

    if (!userExist) {
      return { success: false, error: "Invalid email or password" };
    }

    const userData: User = {
      id: userExist.id || Date.now(),
      username: userExist.username,
      email: userExist.email,
      loginTime: new Date().toISOString()
    };

    return { success: true, user: userData };
  }
}
