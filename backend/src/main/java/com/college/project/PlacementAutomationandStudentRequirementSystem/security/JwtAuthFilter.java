package com.college.project.PlacementAutomationandStudentRequirementSystem.security;

import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ApiError;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final CostumeUserDetailsService userDetailsService;
    private final AuthUtil authUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        log.info("Incoming request: {}", request.getRequestURI());

        String path = request.getServletPath();

        // 🔥 SKIP AUTH APIs
        if (path.startsWith("/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        // ✅ If no token → continue
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // ✅ Extract token
            String token = authHeader.substring(7);

            // ✅ Extract data from JWT
            String username = authUtil.getUserFromToken(token);
            UUID userId = authUtil.extractUserId(token);
            String role = authUtil.extractRole(token);

           // ✅ Avoid double ROLE_ prefix
           if (role != null && !role.startsWith("ROLE_")) {
           role = "ROLE_" + role;
           }

            // ✅ Set authentication only if not already set
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // ✅ Create authorities from role
                List<GrantedAuthority> authorities =
                        List.of(new SimpleGrantedAuthority(role));

                // ✅ Store userId as principal (JWT-based)
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userId,   // 👈 principal
                                null,
                                authorities
                        );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (JwtException e) {
            throw new BadCredentialsException("Invalid or expired token", e);
        }

        filterChain.doFilter(request, response);


    }

// Costume error only for jwt filter
//    private void sendError(HttpServletResponse response,
//                           int status,
//                           String message) throws IOException {
//
//        response.setStatus(status);
//        response.setContentType("application/json");
//
//        ApiError error = new ApiError(status, message);
//
//        ObjectMapper mapper = new ObjectMapper();
//        response.getWriter().write(mapper.writeValueAsString(error));
//    }
}
