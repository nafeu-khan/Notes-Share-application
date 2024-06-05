from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAuthenticatedOrReadOnly(BasePermission):
    """
    The request is authenticated as a user, or is a read-only request.
    """
    def has_permission(self, request, view):
        # Allow read-only access for GET, HEAD, OPTIONS methods
        if request.method in SAFE_METHODS:
            return True
        # Otherwise, require authentication
        return request.user and request.user.is_authenticated
