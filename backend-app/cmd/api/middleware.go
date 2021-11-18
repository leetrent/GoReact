package main

import (
	"errors"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/pascaldekloe/jwt"
)

func (app *application) enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
		next.ServeHTTP(w, r)
	})
}

func (app *application) checkToken(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Vary", "Authorization")
		authHeader := r.Header.Get("Authorization")
		// if authHeader == "" {
		// 	// could set an anonymous user
		// }
		headerParts := strings.Split(authHeader, " ")

		if len(headerParts) != 2 {
			app.errorJSON(w, errors.New("invlid authorization header"))
			return
		}

		if headerParts[0] != "Bearer" {
			app.errorJSON(w, errors.New("authorization error (no bearer token)"))
			return
		}

		token := headerParts[1]
		claims, err := jwt.HMACCheck([]byte(token), []byte(app.config.jwt.secret))
		if err != nil {
			app.errorJSON(w, errors.New("authorization error (HMAC check failed)"))
			return
		}

		if !claims.Valid(time.Now()) {
			app.errorJSON(w, errors.New("authorization error (JWT token has expired)"))
			return
		}

		if !claims.AcceptAudience("mydomain.com") {
			app.errorJSON(w, errors.New("authorization error (invalid audience)"))
			return
		}

		if claims.Issuer != "mydomain.com" {
			app.errorJSON(w, errors.New("authorization error (invalid issuer)"))
			return
		}

		userID, err := strconv.ParseInt(claims.Subject, 10, 64)
		if err != nil {
			app.errorJSON(w, errors.New("authorization error (invalid claims.Subject)"))
			return
		}

		log.Println("[middleware][checkToken] => (userID): ", userID)

		next.ServeHTTP(w, r)
	})
}
