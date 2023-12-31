package com.mm.greenstep.domain.common.config;


import com.mm.greenstep.domain.common.jwt.JwtAuthenticationFilter;
import com.mm.greenstep.domain.common.jwt.JwtTokenProvider;
import com.mm.greenstep.domain.common.oauth.CustomOAuth2UserService;
import com.mm.greenstep.domain.common.oauth.handler.OAuth2FailureHandler;
import com.mm.greenstep.domain.common.oauth.handler.OAuth2SuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;


/**
 * 설정클래스로 등록
 * SpringSecurity 활성화
 * */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final OAuth2FailureHandler oAuth2FailureHandler;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable() // HTTP 기본 인증을 비활성화 -> 인증안되면 기본 로그인창으로 이동
                .cors().and() // CORS 활성화
                .csrf().disable() // CSRF 보호 기능 비활성화 -> REST-API서버용이라서 비활성화
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션관리 정책을 STATELESS(세션이 있으면 쓰지도 않고, 없으면 만들지도 않는다)
                .and()

                // 요청에 대한 인증 설정
                // Spring 설정클래스는 지정된 antMatchers URL순차적 탐색하여 현재 요청과 가장 먼저 매칭되는 규칙 따른다.
                .authorizeRequests()
                .antMatchers("/user/login/**","/OAuth/**","/user/reissue/**","/main/**","/web/","/plogging/map", "/main/picture").permitAll() // 토큰 발급을 위한 경로는 모두 허용
                .antMatchers("/", "/css/**","/images/**","/js/**","/favicon.ico","/h2-console/**").permitAll()
                .antMatchers("/web/update").hasAnyRole("ADMIN") //마이페이지는 권한 있어야함
                .antMatchers("/user/**").hasAnyRole("USER","ADMIN") //마이페이지는 권한 있어야함
                .antMatchers("/**").hasAnyRole("USER","ADMIN") //마이페이지는 권한 있어야함
                .anyRequest().authenticated(); // 그 외의 모든 요청은 인증이 필요하다.
//                .and()

                // OAuth2 로그인 설정시작
//                .oauth2Login()
//                .userInfoEndpoint().userService(customOAuth2UserService) // OAuth2 로그인시 사용자 정보를 가져오는 엔드포인트와 사용자 서비스를 설정
//                .and()
//                .failureHandler(oAuth2FailureHandler) // OAuth2 로그인 실패시 처리할 핸들러를 지정해준다.
//                .successHandler(oAuth2SuccessHandler); // OAuth2 로그인 성공시 처리할 핸들러를 지정해준다.

        return http.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, redisTemplate), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // CORS 설정을 위한 Bean
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*")); // 모든 출처 허용
//        configuration.setAllowedOrigins(Arrays.asList("https://k9b303.p.ssafy.io/api", "https://k9b303.p.ssafy.io/api/", "http://localhost:3000","http://localhost:3000/", "https://k9b303.p.ssafy.io/"));
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000","http://localhost:3000/", "https://k9b303.p.ssafy.io/"));
        configuration.setAllowedHeaders(Arrays.asList("*")); // 모든 헤더 허용
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")); // 허용되는 메소드
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true); // 쿠키 및 인증 정보 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("api/plogging/map", configuration); // 모든 경로에 대한 CORS 설정 적용
        source.registerCorsConfiguration("/**", configuration); // // 모든 경로에 대한 CORS 설정 적용
        return source;
    }

    // 암호화에 필요한 PasswordEncoder Bean 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}