package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func (app *application) writeJSON(w http.ResponseWriter, status int, data interface{}, wrap string) error {
	wrapper := make(map[string]interface{})
	wrapper[wrap] = data
	js, err := json.Marshal(wrapper)
	if err != nil {
		return err
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(js)

	return nil // no error
}

func (app *application) errorJSON(w http.ResponseWriter, err error, status ...int) {
	fmt.Println("[utlities.go][errorJSON] => (err.Error()):", err.Error())

	statusCode := http.StatusBadRequest
	if len(status) > 0 {
		statusCode = status[0]
	}

	type jsonError struct {
		Message string `json:"message"`
	}

	theError := jsonError{
		Message: err.Error(),
	}

	if err.Error() == "unauthorized" {
		app.writeJSON(w, http.StatusUnauthorized, theError, "error")
	} else {
		app.writeJSON(w, statusCode, theError, "error")
	}
}
