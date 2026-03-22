package com.college.project.PlacementAutomationandStudentRequirementSystem.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

@Component
public class AuthUtil {

    @Value("${jwt.secretKey}")
    private String jwtSecretKey;

    @Value("${jwt.tokenDuration}")
    private long jwtTokenDuration;

    //convert to key
    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(CostumeUserDetails costumeUserDetails) {
        return Jwts.builder()
                .subject(costumeUserDetails.getUsername())
//                .claim("userId",costumeUserDetails.getUserId().toString())  // for single key-value pair
                .claims(
                        Map.of(
                                "userId",costumeUserDetails.getUserId(),
                                "role",costumeUserDetails.getRole()
                        )
                )
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtTokenDuration))
                .signWith(getSecretKey())
                .compact();
    }

    public String getUserFromToken(String jwtToken) {
        Claims claims = Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(jwtToken)
                .getPayload();
        return claims.getSubject();
    }

    public boolean isTokenValid(String token, CostumeUserDetails userDetails) {
        final String username = getUserFromToken(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();
        return expiration.before(new Date());
    }

    // Extract user ID from the current authentication (Used for Module service)
    public Long getCurrentUserId() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new RuntimeException("User not authenticated");
        }

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof Long userId)) {
            throw new RuntimeException("Invalid user authentication");
        }

        return userId;
    }

    // Extract user ID from the current authentication (Used for Module service)
    public String getCurrentUserRole() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new RuntimeException("User not authenticated");
        }

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof String userRole)) {
            throw new RuntimeException("Invalid user authentication");
        }

        return userRole;
    }

    // Extract all claims from the token
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public Long extractUserId(String token) {
        return extractAllClaims(token).get("userId", Long.class);
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }
}
